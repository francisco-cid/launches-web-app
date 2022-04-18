function launches_for_agency(names, ids){

    var array_length;
    var start_tag;
    var end_tag;
    var mid;
    array_length = names.length;
    start_tag = "<Card.Text className='text-muted' >";
    var i;
    end_tag = "</Card.Text>";
    for (i = 0; i < 20  ; i++){
        mid = "<Link to = '/launches/"+ids[i]+"'>" + names[i] + "</Link>";
        document.writeln(start_tag + mid + end_tag);
    }
}