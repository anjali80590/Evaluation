function createScoreManager(){
    let students=[];
    return{
        addScore:(name,score)=>{
            students.push({name,score})
        },
        getScores:()=>[...students],
        getSortedScores:()=>[...students].sort((a,b)=>b.score-a.score),
        getFilteredScores:(threshold)=>students.filter(student=>student.score>threshold),
        getAverageScore:()=>{
            if(students.length===0){return 0;}
          return  students.reduce((sum,student)=>sum+student.score,0)/students.length
        }
    }
}

module.exports=createScoreManager;
