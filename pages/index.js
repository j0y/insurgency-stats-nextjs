import Link from 'next/link'
import Matches from "../components/Matches";
import {supabase} from "../components/supabaseClient";
import PlayerSearch from "../components/PlayerSearch";

export default function Home({matches, users}) {
  return (
      <>
          <Matches matches={matches} />
          <PlayerSearch users={users} />
          <br /><br />
          <div>
              <Link
                  href={`/all_stats`}
              >
                  <a>{'All users'}</a>
              </Link>
          </div>
      </>
  )
}

export const getStaticProps = async () => {
    const PAGE_SIZE = 500
    let matches = [];

    let size;
    let page = 0;
    do {
        const {data: matchesBatch, error} = await supabase.from("matches")
            .select(`id, started_at, map, won`)
            .order('started_at', {ascending: false})
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (error) throw error
        page++;
        size = matchesBatch.length;

        matches = matches.concat(matchesBatch);
    } while (size > 0 );

    let users = [];
    page = 0;
    do {
        const {data: usersBatch, error} = await supabase.from("users")
            .select(`id, name, avatar_hash`)
            .order('id', {ascending: true})
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        if (error) throw error
        page++;
        size = users.length;

        users = users.concat(usersBatch);
    } while (size > 0);

    return {
        props: {
            matches,
            users,
        }
    }
}