import {supabase} from "../../components/supabaseClient.js";
import Link from 'next/link'
import WeaponsStatsTable from "../../components/WeaponsStatsTable";
import PlayerMatches from "../../components/PlayerMatches";
import avatarURL from "../../components/helpers/avatarURL";
import PlayerMedals from "../../components/PlayerMedals";

export default function Player({user, userMedals, userMatches}) {

    return (
        <>
            <Link
                href={`/`}
            >
                <a><h2>Back to home page</h2></a>
            </Link>

            <>
                <table>
                    <thead>
                    <tr>
                        <th/>
                        <th className="left">{'User'}</th>
                        <th>{'kills'}</th>
                        <th>{'deaths'}</th>
                        <th>{'kd'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={user.id}>
                        <td><img src={avatarURL(user.avatar_hash)} alt={user.name}/></td>
                        <td className="left">{user.name}</td>
                        <td>{user.kills}</td>
                        <td>{user.deaths}</td>
                        <td>{user.kd}</td>
                    </tr>
                    </tbody>
                </table>

                <h2>Medals</h2>
                <PlayerMedals userMedals={userMedals}/>

                <h2>Weapon stats</h2>
                <WeaponsStatsTable weaponStats={user.all_weapon_stats}/>

                <PlayerMatches userMatches={userMatches}/>
            </>
        </>
    );
}

export const getStaticProps = async (context) => {
    const {data: user, error} = await supabase.from("users")
        .select()
        .eq('id', context.params.id)
        .single()
    if (error) return {
        notFound: true
    }

    const {data: userMedals, mederror} = await supabase.from("user_medals")
        .select(`medal_id, value`)
        .eq('user_id', context.params.id)
    if (mederror) throw mederror

    const PAGE_SIZE = 500
    let userMatches = [];
    let size;
    let page = 0;
    do {
        const {data: matches, materror} = await supabase.from("matches")
            .select(`id, map, started_at, won, match_user_stats!inner(user_id)`)
            .order('started_at', {ascending: false})
            .eq('match_user_stats.user_id', context.params.id)
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (materror) throw materror
        page++;
        size = matches.length;

        userMatches = userMatches.concat(matches);
    } while (size > 0);

    return {
        props: {
            user,
            userMedals,
            userMatches
        }
    }
}

export async function getStaticPaths() {
    const PAGE_SIZE = 500
    let userIDs = [];

    let size;
    let page = 0;
    do {
        const {data: users, error} = await supabase.from("users")
            .select(`id`)
            .order('id', {ascending: true})
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (error) throw error
        page++;
        size = users.length;

        userIDs = userIDs.concat(users.map(user => user.id.toString()));
    } while (size > 0);

    // Get the paths we want to pre-render based on posts
    const paths = userIDs.map(id => ({
        params: {id: id},
    }));

    // We'll pre-render only these paths at build time.
    return {paths, fallback: 'blocking'}
}
