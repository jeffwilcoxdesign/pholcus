/*
Pholcus Projects Controller by Jeff Wilcox 6.28.2016
*/
require("../../css/content/style.css");
import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import { projects } from './Projects.jsx';
const Projects = projects({ React });

//$.ajax({url:"data/rxClaims.txt", dataType:"script", success:function(){
//	getRxClaims(function(userData){
//		const dataObj = Object.assign({}, {configData}, {userData});
ReactDOM.render(
	<Projects />,
	document.getElementById('React-Container')
);
//	});
//}});
