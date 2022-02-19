import {useState} from "react";
import Link from 'next/link'
import formatDate from "./helpers/date"

const PAGE_LIMIT = 10;

export default function PlayerMatches({userMatches}) {
    const [page, setPage] = useState(0);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    if (!userMatches) {
        return <div>{'Can\'t find this users matches'}</div>;
    }

    return (
        <>
            <h2>Matches</h2>

            <>
                <table>
                    <thead>
                    <tr>
                        <th/>
                        <th className="left">{'Map'}</th>
                        <th>{'started'}</th>
                        <th>{'won'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userMatches.slice(page*PAGE_LIMIT, (page+1) * PAGE_LIMIT).map((match) => (
                        <tr key={match.id}>
                            <td>
                                <div className={`map map-${match.map}`}/>
                            </td>
                            <td className="left">
                                <Link
                                    href={`/match/${match.id}`}
                                >
                                    <a>{match.map}</a>
                                </Link>
                            </td>
                            <td>{formatDate(match.started_at)}</td>
                            <td>{match.won ? '✓' : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                {(page + 1) * PAGE_LIMIT < userMatches?.length && <button onClick={nextPage}>{'Next >'}</button>}
            </>
        </>
    );
}