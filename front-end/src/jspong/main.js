let host = "https://localhost:8443/";
let path = host + "api/appong/api/";
let debug = true;


export async function get(token) {
    let response = await fetch(path, {
         headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         } 
        });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_me(token) {
    let response = await fetch(path + 'user/me/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
        } 
    });
    if (response.status != 200)
    {
        console.log('JE SUIS PAS 200');
        throw "Problem with the request (" + response.status + ")";
    }
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_users(token) {
    let response = await fetch(path + 'user/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         }  
    });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_dashboard(token) {
    headers.Authorization += token;
    let response = await fetch(path + 'user/2/dashboard/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_tournament(token) {
    let response = await fetch(path + 'tournament/', { headers : {
        'Authorization': 'Token ' + token,
        'Content-Type':'application/json',
        'Accept': 'application/json'
     } });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_number_of_matches(token) {
    let response = await fetch(path + 'match/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         }
    });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}


export async function get_number_of_users(token) {
    
    let response = await fetch(path + 'user/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         } 
    });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

export async function get_number_of_tournaments(token) {
    let response = await fetch(path + 'tournament/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         }
    });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

export async function get_user_by_id(id, token) {
    let response = await fetch(path + 'user/', {
        headers : {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         }
    });
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].pk === id) {
            if (debug)
                console.log(data[i]);
            return data[i];
        }
    }
    throw "User not found";
}

export async function get_tournament_by_id(id, token) {
    let response = await fetch(path + 'tournament/' + id, { headers : {
        'Authorization': 'Token ' + token,
        'Content-Type':'application/json',
        'Accept': 'application/json'
     }});
    if (response.status == 404)
        throw "Tournament not found";
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_matches_of_user(id, token) {
    let response = await fetch(path + 'match/', { headers : 
        {
        'Authorization': 'Token ' + token,
        'Content-Type':'application/json',
        'Accept': 'application/json'
     } });
    let data = await response.json();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].player1 === id || data[i].player2 === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(matches);
    return matches;
}

export async function is_match_tournament(id, token) {
    let value = false;
    let response = await fetch(path + 'match/' + id, { headers : {
        'Authorization': 'Token ' + token,
        'Content-Type':'application/json',
        'Accept': 'application/json'
     } });
    if (response.status == 404)
        throw "Match not found";
    let data = await response.json();
    if (data.tournament != null)
        value = true;
    if (debug)
        console.log(value);
    return value;
}


export async function get_all_matches_of_tournament(id, token) {
    let response = await fetch(path + 'match/', { headers :
        {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }});
    let data = await response.json();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].tournament === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(matches);
    return matches;
}

export async function get_all_tournaments_from_creator(id, token) {
    let data = await get_all_tournament(token);
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].creator.pk === id) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_tournaments_confirm_of_user(id, token) {
    let data = await get_all_tournament(token);
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].confirmed.includes(id)) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_tournaments_pending_of_user(id, token) {
    let data = await get_all_tournament(token);
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].pending.includes(id)) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_users_of_tournament(id, token) {
    let data = await get_all_matches_of_tournament(id, token);
    let users = [];
    let usersID = [];
    for (let i = 0; i < data.length; i++) {
        let user1 = await get_user_by_id(data[i].player1, token);
        let user2 = await get_user_by_id(data[i].player2, token);
        if (!usersID.includes(user1.pk))
        {
            usersID.push(user1.pk);
            users.push(user1);
        }
        if (!usersID.includes(user2.pk))
        {
            usersID.push(user2.pk);
            users.push(user2);
        }
    }
    if (debug)
        console.log(users);
    return users;
}

/**
 * @brief Recupere un match par son id.
 * 
 * @param id L'id du match.
 * @return Un json contenant les informations du match.
 */
export async function get_match_by_id(id, token) {
    let response = await fetch(path + 'match/' + id, { headers : {
        'Authorization': 'Token ' + token,
        'Content-Type':'application/json',
        'Accept': 'application/json'
     } });
    if (response.status == 404)
        throw "Match not found";
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_users_of_match(id, token) {
    let data = await get_match_by_id(id, token);
    let user1 = await get_user_by_id(data.player1, token);
    let user2 = await get_user_by_id(data.player2, token);
    if (debug)
        console.log([user1, user2]);
    return [user1, user2];
}

export async function get_username_by_id(id, token) {
    let user = await get_user_by_id(id, token);
    if (debug)
        console.log(user.user.username);
    return user.user.username;
}

export async function get_nickname_by_id(id, token) {
    let user = await get_user_by_id(id, token);
    if (debug)
        console.log(user.user.username);
    return user.user.user_nick;
}

export async function login(username, password) {
    let data = {
        "username": username,
        "password": password
    };    
    let response = await fetch(host + 'api/appong/api-auth/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (response.status != 200)
        throw "Problem with the creation of the user (" + response.status + ")";
    let user = await response.json();
    if (debug)
        console.log(user.token);
    return user.token;
}


export async function create_user(username, user_nick, password) {
    let data = {
        "user": {
            "username": username,
            "password": password
        },
        "user_nick": user_nick
    };    
    let response = await fetch(path + 'register/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
        },
        body: JSON.stringify(data)
    });
    if (response.status != 201)
        throw "Problem with the creation of the user (" + response.status + ")";
    let user = await response.json();
    if (debug)
        console.log(user.token);
    return user.token;
}
// TODO: Gerer les pending
export async function create_tournament(name, pending, token) {
    let data = {
        "name": name,
        "pending": pending
    };
    let response = await fetch(path + 'tournament/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.status != 201)
        throw "Problem with the creation of the tournament (" + response.status + ")";
    let tournament = await response.json();
    if (debug)
        console.log(tournament);
    return tournament;
}


export async function create_match(player1, player2, tournament, token) {
    let data = {
        "tournament": tournament,
        "player1": player1,
        "player2": player2,
    };
    let response = await fetch(path + 'match/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         },
        body: JSON.stringify(data)
    });
    let match = await response.json();
    if (debug)
        console.log(match);
    return match;
}

export async function delete_user(id, token) {
    let response = await fetch(path + 'user/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
         }
    });
    if (response.status != 204)
        throw "Problem with the deletion of the user (" + response.status + ")";
    return true;
}

export async function request_pending_friend(friend_id, token) {
    let me = await get_me(token);
    let actuel_pending = me.friends_pending;
    actuel_pending.push(friend_id);
    let data = {
        "friends_pending": actuel_pending
    }
    console.log(token)
    let response = await fetch(path + 'user/friends_pending/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.status != 200)
        throw "Problem with the addition of the friend (" + response.status + ")";
    return true;
}
