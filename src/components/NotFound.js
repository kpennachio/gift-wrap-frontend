import React from 'react';
import { Link } from 'react-router-dom'



const NotFound = ({person}) => {



  return (
    <div className="planner-content">
    <h1>Page not found!</h1>
    <Link to="/dashboard">return to dashboard</Link>
    </div>

  );

}


export default (NotFound);
