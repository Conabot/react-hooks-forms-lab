import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemUpdated}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInputText, setSearchInputText] = useState("")
  
  function handleSelectCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) { 
    setSearchInputText(event.target.value);
  }
  function onItemFormSubmit(newItem){
    onItemUpdated(newItem)
  }

  //Filter using for Category change
  const tempArray= items
  .filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  })

  //Filter using for input text search 
  const itemsToDisplay =
  tempArray.filter((item) => {
    if (searchInputText === "")
     {return true};
    if (item.name.toLowerCase().includes(searchInputText.toLocaleLowerCase())) 
    {return true};
    
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleSelectCategoryChange} 
              onSearchChange={onSearchChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
