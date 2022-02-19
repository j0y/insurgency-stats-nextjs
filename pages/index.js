import Head from 'next/head'
import Matches from "../components/Matches";
import {supabase} from "../components/supabaseClient";

export default function Home({matches}) {
  return (
      <Matches matches={matches} />
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

    return {
        props: {
            matches,
        }
    }
}