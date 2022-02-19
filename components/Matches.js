import Link from 'next/link'
import formatDate from "./helpers/date"
import {useState} from "react";

const PAGE_LIMIT = 10;

export default function Matches({matches}) {
    const [page, setPage] = useState(0);

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    return (
        <>
            <h2>Matches</h2>

            {matches?.length && (
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
                        {matches.slice(page*PAGE_LIMIT, (page+1) * PAGE_LIMIT).map((match) => (
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
                    {(page + 1) * PAGE_LIMIT < matches?.length && <button onClick={nextPage}>{'Next >'}</button>}
                </>
            )}
        </>
    );
}
