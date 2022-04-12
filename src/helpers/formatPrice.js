import React from "react";

const formatPrice = price => (price.toFixed(2).replace(/[.]/g,','))
  
  export default formatPrice