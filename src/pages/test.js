


<script>


class BeeSpecies{
    constructor(name, queen, worker, unknown){
        this.name = name;
        this.queen = queen;
        this.worker = worker;
        this.unknown = unknown;
    }
}
  const removeDuplicates=(list)=>{
    var arrayreturned =[...list]
    for(var index=0;index<list.length;index++){
      for (var second=index+1;second<list.length;second++){
        if (list[index].name == list[second].name){
          arrayreturned.splice(index)
          arrayreturned.splice(second)
          var queen = list[index].queen + list[second].queen
          var worker = list[index].worker+ list[second].worker
          var unknown = list[index].unknown +list[second].unknown
          var beecombined = new BeeSpecies(list[index].name, queen, worker, unknown )
          arrayreturned.push(beecombined)
        } 
      }
    }
    return arrayreturned
  };
</script>
