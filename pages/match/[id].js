import {useState} from "react";
import React from 'react';
import {supabase} from "../../components/supabaseClient";
import formatDate from "../../components/helpers/date"
import WeaponsStatsTable from "../../components/WeaponsStatsTable";
import avatarURL from "../../components/helpers/avatarURL";
import Link from 'next/link'

export default function Match({match, userStats}) {
    const [detailsOpen, setDetailsOpen] = useState(null);

    if (!match) {
        return <div>{'Can\'t find this match'}</div>;
    }


    return (
        <>
            <Link
                href={`/`}
            >
                <a><h2>Back to home page</h2></a>
            </Link>


            <table>
                <thead>
                <tr>
                    <th className="left">{'Map'}</th>
                    <th>{'started'}</th>
                    <th>{'won'}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="left">
                        {match.map}
                    </td>
                    <td>{formatDate(match.started_at)}</td>
                    <td>{match.won ? '✓' : ''}</td>
                </tr>
                </tbody>
            </table>
            {userStats && (
                <>
                    <h2>Players</h2>
                    <table>
                        <thead>
                        <tr>
                            <th/>
                            <th className="left">{'Player'}</th>
                            <th>{'kills'}</th>
                            <th>{'deaths'}</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {userStats.map((user) => (
                            <React.Fragment  key={user.user_id}>
                                <tr>
                                    <td><img src={avatarURL(user.users.avatar_hash)} alt={user.name}/></td>
                                    <td className="left">
                                        <Link
                                            href={`/user/${user.user_id}`}
                                        >
                                            <a>{user.users.name}</a>
                                        </Link>
                                    </td>
                                    <td>{user.kills}</td>
                                    <td>{user.deaths}</td>
                                    <td>
                                        <button onClick={() => setDetailsOpen(user.user_id)}>Details</button>
                                    </td>
                                </tr>
                                <tr className={detailsOpen === user.user_id ? '' : ' hidden'}>
                                    <td colSpan={4}>
                                        <WeaponsStatsTable weaponStats={user.weapon_stats}/>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}

export const getStaticProps = async (context) => {
    const {data: match, error} = await supabase.from("matches")
        .select()
        .eq('id', context.params.id)
        .single()
    if (error) return {
        notFound: true
    }

    const {data: userStats, errorus} = await supabase.from("match_user_stats")
        .select(`user_id, users (name, avatar_hash), kills, deaths, weapon_stats`)
        .order('kills', {ascending: false})
        .eq('match_id', context.params.id)
    if (errorus) throw errorus

    return {
        props: {
            match,
            userStats,
        }
    }
}

export async function getStaticPaths() {
    const PAGE_SIZE = 500
    let matchIDs = [];

    let size;
    let page = 0;
    do {
        const {data: matches, error} = await supabase.from("matches")
            .select(`id`)
            .order('started_at', {ascending: false})
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (error) throw error
        page++;
        size = matches.length;

        matchIDs = matchIDs.concat(matches.map(match => match.id.toString()));
    } while (size > 0 );

    // Get the paths we want to pre-render based on posts
    const paths = matchIDs.map(id => ({
        params: {id: id},
    }));

    // We'll pre-render only these paths at build time.
    return {paths, fallback: 'blocking'}
}