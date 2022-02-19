import Link from 'next/link'
import formatDate from "./helpers/date"

const PAGE_LIMIT = 10;

export default function Matches({matches}) {
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
                        {matches.map((match) => (
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
                </>
            )}
        </>
    );
}
