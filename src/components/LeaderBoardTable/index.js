import React, { useState, useEffect } from "react";
import { dateTransformer, sortUsers } from "../../helperFunctions/helpers";
import dayjs from 'dayjs';

export default function LeaderBoardTable() {
  const [userScores, setUserScores] = useState();

  const fetchScores = async () => {
    const response = await fetch("https://hptq-backend.herokuapp.com/users");
    const userData = await response.json();
    const sortedUsers = sortUsers(userData);
    setUserScores(sortedUsers);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="tablediv">
      <table className="table">
        <tr>
          <th>Rank</th>
          <th>UserName</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
        {userScores &&
          userScores.map((user, index) => (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.scores}</td>
                <td>{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>
              </tr>
            </>
          ))}
      </table>
    </div>
  );
}
