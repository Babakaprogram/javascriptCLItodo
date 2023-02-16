const fs = require("fs");
const arg = process.argv;


const add = ()=>
{
    if(arg[3] && arg[4])
    {
        var data = arg.slice(3,5);
        data=data.join(" ");
        console.log(data);
        if(fs.existsSync("task.txt"))
        {
            fs.appendFile("task.txt",data+"\n",(err)=>{if (err) return (err);});
        }
        else
        {
            fs.writeFile("task.txt",data+"\n",(err)=>{if (err) return (err);});
        }
        console.log(`Added task: ${arg[4]} with priority ${arg[3]}`);
    }
    else
    {
        console.log(`Error: Missing tasks string. Nothing added!`);
    }
}

const ls = ()=>
{
    if(fs.existsSync("task.txt") && fs.readFileSync("task.txt","utf-8").length>0)
    {
        var read=fs.readFileSync("task.txt","utf-8");
        read=read.split("\n");
        read=read.filter(function(e){return e;});
        
        for(i=0;i<read.length;i++)
        {
            
            console.log(`${i+1}.${read[i].slice(1)} [${read[i].slice(0,1)}]`);
        }
    }
    else
    {
        console.log(`There are no pending tasks!`);
    }
}

const del = ()=>
{
    if(arg[3])
    {
        var read=fs.readFileSync("task.txt","utf-8");
        if(arg[3]!=0 && arg[3]<=((read.split("\n")).length)-1)
        {
            read=read.replace((read.split("\n"))[arg[3]-1],'');
		    read=read.split("\n");
		    read=read.filter(function(e){return e;});
		    read=read.toString();
		    var myRegEx=/\,/g;
		    read=read.replace(myRegEx,"\n")+"\n";
		    console.log("Deleted task \#"+arg[3]);
		    fs.writeFile("task.txt",read,(err)=>{if (err) throw (err);});
        }
        else
        {
            console.log(`Error: task with index #${arg[3]} does not exist. Nothing deleted.`);
        }
    }
    else
    {
        console.log(`Error: Missing NUMBER for deleting tasks.`);
    }
}

const done = ()=>
{
    if(arg[3])
	{
        var read=fs.readFileSync("task.txt","utf-8");
        var myregex=/\,/g;
        var data=(read.split("\n"))[arg[3]-1];
	
        
	    if(arg[3]!=0 && arg[3]<=read.split("\n").length-1)
	    {
            console.log("Marked task \#"+arg[3]+" as done.");
            
            read=read.replace(data,'');
            read=read.split("\n");
            read=read.filter(function(e){return e!=undefined;});
            read=read.filter(function(e){return e;});
            read=read.toString();
            read=read.replace(myregex,"\n")+"\n";
            fs.writeFile("task.txt",read,(err)=>{if(err) throw(err);}); 

            
            data=data.slice(1);
            data=data.split();
            data=data.toString();
            data=data.trim();
            if(fs.existsSync("completed.txt"))
            {
                fs.appendFile("completed.txt",data+"\n",(err)=>{if (err) throw (err);});
            }
            else
            {
                fs.writeFile("completed.txt",data+"\n",(err)=>{if (err) throw(err);});
            }
	    }
	    else
        {
            console.log("Error: todo \#"+arg[3]+" does not exist.");
            
        }
	    
	}
    else
    {
        console.log("Error: Missing NUMBER for marking todo as done.");
    }
}

const report=()=>
{
	if(fs.existsSync("task.txt"))
	{
        var read_task=fs.readFileSync("task.txt","utf-8");
        read_task=read_task.split("\n");
        read_task=read_task.filter(function (e) {return e;});
	}
	else
	{
        var read_task=0;
    }
    if(fs.existsSync("completed.txt"))
	{
        var read_completed=fs.readFileSync("completed.txt","utf-8");
        read_completed=read_completed.split("\n");
        read_completed=read_completed.filter(function(e){return e;});
	}
	else
	{
        var read_completed=0;
    }
    let complete_length=0;
    let task_length=0;
    if(read_completed.length!=undefined)
    {
        complete_length=read_completed.length;
    }
    if(read_task.length!=undefined)
    {
        task_length=read_task.length;
    }
	console.log(" Pending : "+task_length+" Completed : "+complete_length);

}
const Usage = ()=>
{
const text = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;

console.log(text);
}
if(arg.length>2)
{
    switch (arg[2]) {
        case "add":
            add();
            break;
        case "ls":
            ls();
            break;
        case "del":
            del();
            break;
        case "done":
            done();
            break;
        case "report":
            report();
            break;
        case "help":
            Usage();
        case (''):
            Usage();
        default:
            break;
    }
}
else
{
    Usage();
}