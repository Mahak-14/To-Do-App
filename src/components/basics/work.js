import React, {useState , useEffect} from "react";
import "./style.css";



//get the local storage  data back;
const getLocalData = () =>{
    
    const lists = localStorage.getItem("mytodoList");//passing the key as a parameter

    //if my list had data then
    //we ll assume it to be our current data so we need it in the form of array but it will be returning in the form of string
    if(lists){
        return JSON.parse(lists);

    }
    //if there is nothing
    else{
        return [];// returns an empty array

    }
    

};


const Work = ()=>
{
    //creating useState 
    const[inputdata,setInputData]=useState("");
    const[items,setItems]=useState(getLocalData);// so in this state which is empty array elements gets stored when + is clicked.
   //useState:  //we need one state variable for edit so that we can pass the id
   const[isEditItem,setIsEditItem] = useState("");
   //to toggle + symbol to update symbol
   const[toggleButton,setToggleButton] = useState(false);

   


    //add the items function: this function runs when + sign is pressed
    const addItem = ()=>
    {
        // if empty
        if(!inputdata)
        {
            alert("please enter the data");
        }
        else if (inputdata && toggleButton)
        {
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem)
                    {
                        return{...curElem,name:inputdata}
                    }
                    return curElem;

                })
            );

            setInputData([]);

            setIsEditItem(null);
             
             setToggleButton(false);

        }


        //if inputdata has data then we need to add in items and we will run loop on it
        else{
         //to get an unique id for each item that will helps us to delete the item
            const myNewInputData={
                //key-value pair
                id:new Date().getTime().toString(),
                name:inputdata,
            };
            setItems([...items,myNewInputData]);//we have used spread operator means whatever data was present in the prev state and inputdata means the new data which we entered sabko us array me daldo.
            //whatever data we change gets reflected here
          
            setInputData("");
           
 
    };
};


    //edit items

    const editItem = (index) => {
        // get the element id whose value we want to update
        const item_todo_edited = items.find((curElem) =>
        {
            return curElem.id ===index;
        });

        //to see the data which we edited in place of add Item
        setInputData(item_todo_edited.name);

        setIsEditItem(index);
         //if value true means we are editing
         setToggleButton(true);
        };


    









    //to delete the item from the list :runs when delete sign is clicked and id(unique id is passed)
    const deleteItem = (index) =>
    {
        //will run a loop but it will filter it out
        //return  those items whose id doesnot matches with the index ,will return in the form of array
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index; 
        });
        setItems(updatedItems);

    };

    //to remove all the elements together so we dont need indiviual ids 
    const removeAll = () =>
    {
        setItems([]);//passing an empty array means updated function ka value total empty hogaya toh state i.e items bhi total empty hojayega

    }

    //adding data to the local storage
    //whenever my  items value changes then only we add value to the local storage
    //localStorage works in the form key value pair and we can only pass string and nothing else
    // this only sets the local storage data ,once we refresh everything goes away 
    //so we need to get the local storage data  back aalso 
    useEffect(()=>{
        localStorage.setItem("mytodoList",JSON.stringify(items));// json method makes the array to string

    },[items])
    return(
        <>
        <div className ="main-div">
            <div className="child-div">
                <figure>
                
                {/** <img src=" " alt="todologo"/>*/} 
                    <figcaption>Add your Work list here</figcaption>
                </figure>
                <div className ="addItems">
                    {/**whaterver user writes will come here */}
                    <input
                        type="text"
                        placeholder="Add Item"
                        className="form control"
                        value={inputdata}
                        onChange={(event) => setInputData(event.target.value)}// whatever user writes in add item wala section , we want that value to save in state i.e inputdata

                        /> 
                        {/**conditional rendering */}
                        {
                            toggleButton? (<i className ="far fa-edit  add-btn " onClick={addItem} ></i>):(<i className ="fa fa-plus  add-btn " onClick={addItem} ></i>)
                        }



                        {/**dont call like addItem() then it will  call automatically*/}
                </div>
                
                {/*show our items*/}
                    <div className="showItems">
                        {/**iterating over each element of the array using map method */}
                        {/**took index which acts as a unique key for each div*/}
                        {items.map((curElem)=>{
                        return(
                            <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i className ="far fa-edit  add-btn " onClick = {() => editItem(curElem.id)} ></i>
                            <i className ="far fa-trash-alt  add-btn " onClick={() => deleteItem(curElem.id)} ></i>

                            </div>
                        </div>

                        );
                        })}
                        
                        


                       
                    </div>

               
{/*remove all button */}
                <div className="showItems"><button className = "btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                   <span>CHECK LIST</span> 
                    </button></div>
            </div>
        </div>



        </>
    );

   


   
};

export default Work;