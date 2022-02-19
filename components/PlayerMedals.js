const medal_descriptions = {
    1: "Most kills",
    2: "Highest KDR",
    3: "Get 5 wins",
    4: "Get 3 wins in a row",
    5: "Get the most kills on your team 5 times",
    6: "Get a kill/death ratio of over average in 5 matches",
    7: "Kill 100 enemies with a knife",
    8: "Kill 1000 enemies with a pistol",
    9: "Kill 1000 enemies with a bolt rifle",
    10: "Kill 5000 enemies with a rifle",
    11: "Kill 1000 enemies with explosives",
    12: "Win map alone",
    13: "Complete map without dying",
    14: "6 months",
    15: "1 year",
    16: "2 years",
    17: "3 years",
    18: "4 years",
}

export default function PlayerMedals({userMedals}) {
    if (!userMedals) {
        return <div>{'Can\'t find this users medals'}</div>;
    }

    return (
        <div className="medals">
            {userMedals.map((medal) => (
                <div key={medal.medal_id} className="medal-wrapper">
                    <div className={`medal medal-${medal.medal_id}`}/>
                    <div>
                        {medal_descriptions[medal.medal_id]}
                        {medal.medal_id === 13 && (
                            <span> ({medal.value} kills)</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}