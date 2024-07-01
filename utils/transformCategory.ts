export const transformCategory = (category) => {
    if(category){
        return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    }
  };