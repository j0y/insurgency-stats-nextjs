import {useState} from "react";
import Link from 'next/link'
import avatarURL from "./helpers/avatarURL";

const PAGE_LIMIT = 10;

export default function PlayerSearch({users}) {
    const [page, setPage] = useState(0);
    const [searchString, setSearchString] = useState('');

    const nextPage = () => {
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    const onInputChange = (e) => {
        setSearchString(e.target.value);
        if (page !== 0) {
            setPage(0);
        }
    }

    let results = [];
    if (searchString.length >= 3) {
        results = users.filter(u => u.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    return (
        <>
            <h2>User search</h2>
            <input type="text" onChange={onInputChange}/>

            <>
                {results?.length ? (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th/>
                                <th className="left">{'User'}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.slice(page * PAGE_LIMIT, (page + 1) * PAGE_LIMIT).map((user) => (
                                <tr key={user.id}>
                                    <td><img src={avatarURL(user.avatar_hash)} alt={user.name}/></td>
                                    <td className="left">
                                        <Link
                                            href={`/user/${user.id}`}
                                        >
                                            <a>{user.name}</a>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {page > 0 && <button onClick={previousPage}>{'< Previous'}</button>}
                        {(page + 1) * PAGE_LIMIT < results?.length &&
                        <button onClick={nextPage}>{'Next >'}</button>}
                    </>
                ) : (
                    <p>No users found</p>
                )}
            </>
        </>
    );
}