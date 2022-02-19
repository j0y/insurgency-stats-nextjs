import {supabase} from "../components/supabaseClient.js";
import Link from 'next/link'

export default function AllStats({users}) {
    let text = "User\tkills\tdeaths\tfratricide\tkd\n"

    for (let i = 0; i < users.length; i++) {
        text = text + users[i].name + "\t" + users[i].kills + "\t" + users[i].deaths + "\t" + users[i].fratricide + "\t" + users[i].kd + "\n";
    }

    return (
        <>
            <Link
                href={`/`}
            >
                <a><h2>Back to home page</h2></a>
            </Link>

            <h2>All Users</h2>
            <>
                {users?.length ? (
                    <textarea value={text} readOnly rows={users.length + 5} cols={60}/>
                ) : (
                    <p>No users currently</p>
                )}
            </>
        </>
    );
}

export const getStaticProps = async () => {
    const PAGE_SIZE = 500
    let users = [];

    let size;
    let page = 0;
    do {
        const {data: usersBatch, error} = await supabase.from("users")
            .select(`id, name, kills, deaths, fratricide, kd`)
            .order('id', {ascending: true})
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (error) throw error
        page++;
        size = usersBatch.length;

        users = users.concat(usersBatch);
    } while (size > 0);

    return {
        props: {
            users,
        }
    }
}
