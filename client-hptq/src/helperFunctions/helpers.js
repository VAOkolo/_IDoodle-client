export function dateTransformer(date){
    const d = new Date (date)
    console.log(d)
    return d.toString();
}

export function sortUsers(data){
    return data.sort(function(a,b) {
        return b.scores - a.scores;
    })
}
