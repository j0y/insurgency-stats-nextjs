import Head from 'next/head'
import Matches from "../components/Matches";
import {supabase} from "../components/supabaseClient";

export default function Home({matches}) {
  return (
      <Matches matches={matches} />
  )
}

export const getStaticProps = async () => {
    const {data: matches, error} = await supabase.from("matches")
        .select(`id, started_at, map, won`)
        .order('started_at', {ascending: false})
        .range(0, 10)
    if (error) throw error

    return {
        props: {
            matches,
        }
    }
}