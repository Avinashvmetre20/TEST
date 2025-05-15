let requests = [["excavator", 50000], ["bulldozer", 70000]]
let sellers = [["excavator", 45000], ["bulldozer", 68000], ["excavator", 48000]]
function question(requests,sellers){
    let result = []
    for(let i=0;i<requests.length;i++){
        let min = Infinity;
        for(let j=0;j<sellers.length;j++){
            if(requests[i][0] == sellers[j][0]){
                if(requests[i][1]>=sellers[j][1]){
                    min = Math.min(min,sellers[j][1])
                }
            }
        }
        result.push(min)
    }
    return result
}
let result = question(requests,sellers);
console.log(result)
