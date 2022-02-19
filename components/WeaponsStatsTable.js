export default function WeaponsStatsTable({weaponStats}) {
    return (
        <table>
            <thead>
            <tr>
                <th className="left">{'weapon'}</th>
                <th>{'kills'}</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(weaponStats).map((weapon, i) => (
                <tr key={weapon}>
                    <td className="left">
                        {weapon}
                    </td>
                    <td>{weaponStats[weapon]}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}