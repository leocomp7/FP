/**
 * 
 */

var refDivPadre = document.getElementById('contenedorPrincipal');
var divNuevo;
var value;
var refreshIntervalId;


function getBaseUrl()
{
	var getUrl = window.location;
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
	return baseUrl;
}
function readEmpresasSistemaEcuesta(){
	
	var DTO = {
			empCodigo:1,
			empEmpleados:1,
	    };
	
	
	//alert(getBaseUrl());
	//alert('inside readEmpresasSistemaEcuesta');
	$.ajax({
	    type: 'GET',
	    url: getBaseUrl()+'/EmpresaReporteController',
	    dataType: "jsonp",
	    contentType: "application/json",
	    success: function(data, textStatus, jqXHR){
	    },
	    error: function(data1, textStatus, errorThrown){
	    	
	    	//alert('data after json '+data1.responseText);
	    	
	    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
	
	    	if(data.success){
	        	$("#ddlContratoSearch").empty();
	        	$("#ddlContratoSearch").append("<option value=''>--Seleccione--</option>");
	
	       		$.each(eval(data.data), function(key, value) {
	       			$("#ddlContratoSearch").append("<option value='"+value.empCodigo+"'>" + value.empNombreComercial + "</option>");
	      		});
	    	}
		}
	});
}


function loadEnterpriseEvaluacion(opcion)
{
	//alert('la opcion elejida fue: '+opcion );
	
	var DTO = {
			empCodigo:opcion,
	    };
	
	$.ajax({
	    type: 'GET',
	    url: getBaseUrl()+'/EncuestaEmpresaReportesController',
	    dataType: "jsonp",
	    contentType: "application/json",
	    data:DTO,
	    success: function(data, textStatus, jqXHR){
	    },
	    error: function(data1, textStatus, errorThrown){
	    	
	    	//alert('data after json '+data1.responseText);
	    	
	    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
	
	    	if(data.success){
	        	$("#ddlEvaluacionSearch").empty();
	        	$("#ddlEvaluacionSearch").append("<option value=''>--Seleccione--</option>");
	
	       		$.each(eval(data.data), function(key, value) {
	       			$("#ddlEvaluacionSearch").append("<option value='"+value.eenCodigo+"'>" + value.encNombre + " (" + value.eenFechaInicio + ")" +  "</option>");
	      		});
	    	}
		}
	});
	
}


function  showReportGlobalSatisfacction()
{
	
	var DTO = {
			eenCodigo:$("#ddlEvaluacionSearch").val(),
	    };
	
	var totalReporteGlobal = 0 ;
	if($("#ddlEvaluacionSearch").val() > 0)
	{
		$.ajax({
		    type: 'GET',
		    url: getBaseUrl()+'/ReporteSatisfaccionGlobalController',
		    dataType: "jsonp",
		    contentType: "application/json",
		    data:DTO,
		    success: function(data, textStatus, jqXHR){
		    },
		    error: function(data1, textStatus, errorThrown){
		    	
		    	//alert('data after json '+data1.responseText);
		    	
		    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
		
		    	if(data.success){	    		
		       		$.each(eval(data.data), function(key, value) {
		       			
		       			totalReporteGlobal = totalReporteGlobal + value.total;
		       			
		      		});
		       		
		       		
		       		/*PROCESO DE LIMPIEZA DEL DIV GENERAL*/
		       		RemoveTBody();
		       		/* FIN PROCESO DE LIMPIEZA*/
		       		
		       		$.each(eval(data.data), function(key, value) {
		       			GeneraGraficoProgressBar(totalReporteGlobal,value.total,value.resDescripcion,value.eenCodigo,value.resOrden);
		      		});
		    	}
			}
		});
	}
}

function GeneraGraficoProgressBar(totalReporteGlobal,sub_total,text_resDescripcion,text_eenCodigo,text_resOrden)
{

	refDivPadre = document.getElementById('contenedorPrincipal');

	
	divNuevo = document.createElement('div');
	

	
	//buttonComponentPrev.setAttribute('type','button');
	divNuevo.setAttribute('id',text_eenCodigo+'R'+text_resOrden);
	

	/*PROCESO DE LA GRAFICA PROGRESS BAR*/
	var nombreDivHijo='';
	nombreDivHijo='#'+text_eenCodigo+'R'+text_resOrden;
	
	var textoCodigo=document.createTextNode(text_resDescripcion);
	refDivPadre.appendChild(divNuevo);
	
	divNuevo.appendChild(textoCodigo);
	
	myProgress = $(nombreDivHijo).progressbarManager({
		totalValue : totalReporteGlobal,
	     animate : true ,
	     stripe : true,
	});
	
	myProgress.setValue(sub_total);
	
	/*
	myvalue = 0;
	valorRef= 0;
	valorRef=sub_total;
	var refreshIntervalId = setInterval(function(){
		console.log('entro a set interval frecuencias: '+'value es: '+myvalue+', deberian es: '+valorRef)
			if(myvalue <= valorRef)
			{
				console.log('frecuencias estableciend valor: '+myvalue)
				myProgress.setValue(myvalue);
				myvalue+= 1;
			}
			else
			{
				clearInterval(refreshIntervalId);
				return;
			}
	},200);
	
	myProgress.setValue(sub_total);*/
	
	var color="";
	/*eleccion del color*/
	switch(text_resOrden) {
    case 5:
    	color = "success";
        break;
    case 4:
        color = "info";
        break;
    case 3:
        color = "primary";
        break;
    case 2:
        color = "warning";
        break;
    case 1:
        color = "danger";
        break;
    default:
        color = "primary";
	}
	
	myProgress.style(color).animate().stripe();
	
	
}



function RemoveTBody()
{
	var refDivPadre = document.getElementById('contenedorPrincipal');
	
	var hijosDiv=refDivPadre.childNodes;
	
	while(hijosDiv.length>0)
	{
		for(k=hijosDiv.length-1; k >=0 ;k--)
		{
			refDivPadre.removeChild(hijosDiv[k]);
		}
	}
}


function  showReportPuntalesPilares()
{
	
		
	var DTO = {
			eenCodigo:$("#ddlEvaluacionSearch").val(),
	    };
	
	var totalReporteGlobal = 0 ;
	if($("#ddlEvaluacionSearch").val() > 0)
	{
		$.ajax({
		    type: 'GET',
		    url: getBaseUrl()+'/ReportePuntalPilarGeneralController',
		    dataType: "jsonp",
		    contentType: "application/json",
		    data:DTO,
		    success: function(data, textStatus, jqXHR){
		    },
		    error: function(data1, textStatus, errorThrown){
		    	
		    	//alert('data after json '+data1.responseText);
		    	
		    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
		    	if(data.success){	
		    		/*PROCESO DE LIMPIEZA DEL DIV GENERAL*/
		    		RemoveTBody();
		    		/* FIN PROCESO DE LIMPIEZA*/
		       		$.each(eval(data.data), function(key, value) {
		       			
		       			GraficarPuntalPilarDetalle(value.ppiCodigo,value.eenCodigo,value.ppiNombre);
		       			
		      		});
		    	}
			}
		});
	}
}


function GraficarPuntalPilarDetalle(ppiCodigo,eenCodigo,Nombre)
{
	console.log('Puntal a Graficar: '+Nombre+', encuesta: '+eenCodigo+', codigoPuntal: '+ppiCodigo);
	
	
	var DTO = {
			eenCodigo:eenCodigo,
			ppiCodigo:ppiCodigo,
	    };
	
		$.ajax({
		    type: 'GET',
		    url: getBaseUrl()+'/ReportePuntalPilarDetalleController',
		    dataType: "jsonp",
		    contentType: "application/json",
		    data:DTO,
		    success: function(data, textStatus, jqXHR){
		    },
		    error: function(data1, textStatus, errorThrown){
		    	
		    	console.log('data after json '+data1.responseText);
		    	
		    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
		
		    	if(data.success){

		    		totalReportePilarPuntalDetalle = 0;
		    		subTotalPositivos = 0;
		    		porcentaje =  0 ;
		       		
		       		$.each(eval(data.data), function(key, value) {
		       			
		       			totalReportePilarPuntalDetalle = totalReportePilarPuntalDetalle + value.total;
		       			
		       			
		       			/*Proceso de sumar los positivos: */
	       				switch(value.resOrden) {
	       			    case 5:
	       			    	subTotalPositivos = subTotalPositivos + value.total;
	       			        break;
	       			    case 4:
	       			    	subTotalPositivos = subTotalPositivos + value.total;
	       			        break;
	       			    default:
	       			    	subTotalPositivos += 0;
	       				}
		      		});
		       		// SE SALE DEL BUCLE LUEGO DE OBTENER LOS TOTALES INTERESADOS:
		       		
		       		
		       		/* SE REALIZA UNA SOLA GRAFICA POR INVOCACION DEL DETALLE*/
		       		/*PROCESO DE LA GRAFICA*/		       		
		       		refDivPadre = document.getElementById('contenedorPrincipal');
		       		divNuevo = document.createElement('div');
		       		parrafoNuevo = document.createElement('p');
		       		canvasNuevo = document.createElement('canvas');
		       		//buttonComponentPrev.setAttribute('type','button');
		       		divNuevo.setAttribute('id',ppiCodigo+'Div'+eenCodigo);
		       		divNuevo.setAttribute('style','display:inline-block');
		       		canvasNuevo.setAttribute('id',ppiCodigo+'Cvs');
		       		/*PROCESO DE LA GRAFICA PROGRESS BAR*/
		       		var nombreCanvas='';
		       		nombreCanvas=ppiCodigo+'Cvs';
		       		var textoCodigo=document.createTextNode(Nombre);
		       		refDivPadre.appendChild(divNuevo);
		       		parrafoNuevo.appendChild(textoCodigo);
		       		divNuevo.appendChild(parrafoNuevo); 
		       		divNuevo.appendChild(canvasNuevo);
		       		if(totalReportePilarPuntalDetalle>0)
		       			porcentaje = (subTotalPositivos/totalReportePilarPuntalDetalle)*100;
		       		else
		       			porcentaje = 0;
		       		console.log('Puntal: '+Nombre+' , porcentaje: '+porcentaje+', totalPositivos: '+subTotalPositivos+', TotalPilar: '+totalReportePilarPuntalDetalle);
		       		labels   = [];
		       		labels[0]   = {porcentaje};
		       		//RGraph.Reset(nombreCanvas);
		       		
		       		var grafico = new RGraph.SemiCircularProgress({
		    			id:nombreCanvas,
		    			min: 0,
		    			max: 100,
		    			value : porcentaje,
		    			options: {
		    				colors : ['Gradient('+'#00EE76'+':'+'#008B45'+')'],
		    				unitsPost: '%',
		    				textAccessible: false,
		    				labelsCenterSize: 17
		    			}
		       		});
		       		
		       		grafico.set({
		       			value : 7,
			            });
		       		grafico.draw();
		       		//grafico.value = porcentaje;
		       		//RGraph.Reset(nombreCanvas);
		    	}
			}
		});
}

function showReportCumplimiento()
{
	var DTO = {
			eenCodigo:$("#ddlEvaluacionSearch").val(),
	    };
	
	var totalReporteGlobal = 0 ;
	if($("#ddlEvaluacionSearch").val() > 0)
	{
		$.ajax({
		    type: 'GET',
		    url: getBaseUrl()+'/ReporteCumplimientoController',
		    dataType: "jsonp",
		    contentType: "application/json",
		    data:DTO,
		    success: function(data, textStatus, jqXHR){
		    },
		    error: function(data1, textStatus, errorThrown){
		    	
		    	//alert('data after json '+data1.responseText);
		    	
		    	var data=JSON.parse(eval(JSON.stringify(data1.responseText)));
		
		    	if(data.success){
		    		

		       		/*PROCESO DE LIMPIEZA DEL DIV GENERAL*/
		       		RemoveTBody();
		       		/* FIN PROCESO DE LIMPIEZA*/
		       		
		       		$.each(eval(data.data), function(key, value) {
		       			console.log('total deberian: '+value.totalDeberian)
		       			/*PRIMER PROGRESS BAR */
		       			refDivPadre = document.getElementById('contenedorPrincipal');
		       			divNuevo = document.createElement('div');
						//buttonComponentPrev.setAttribute('type','button');
						divNuevo.setAttribute('id','indiceTotal');
						refParrafo = document.createElement('pTotal');
						var textoCodigo=document.createTextNode('Total: '+value.totalDeberian);
						refDivPadre.appendChild(divNuevo);
						refParrafo.appendChild(textoCodigo);
						divNuevo.appendChild(refParrafo);

		       			myProgress = $('#indiceTotal').progressbarManager({
		       					totalValue : value.totalDeberian,
		       					animate : true ,
		       					stripe : true		       			
		       			});
		       			
		       			myvalue = 0;
		       			valorRef= 0;
		       			valorRef=value.totalDeberian;
		       			var refreshIntervalId = setInterval(function(){
		       				console.log('entro a set interval: '+'value es: '+myvalue+', deberian es: '+valorRef)
		       					if(myvalue <= valorRef)
		       					{
		       						console.log('estableciend valor: '+myvalue)
		       						myProgress.setValue(myvalue);
		       						myvalue+= 1;
		       					}
		       					else
		       					{
		       						clearInterval(refreshIntervalId);
		       						return;
		       					}
		       			},200);
		       			
		       			myProgress.style('success').animate().stripe();
		       			
		       			
		       			/*SEGUNDO PROGRESS BAR*/
		       			
		       			
		       			divNuevo = document.createElement('div');
						//buttonComponentPrev.setAttribute('type','button');
						divNuevo.setAttribute('id','indiceRealizaronEncuesta');
						refParrafo = document.createElement('pFinalizados');
						var textoCodigo=document.createTextNode('Finalizados: '+value.totalRespondieron);
						refDivPadre.appendChild(divNuevo);
						refParrafo.appendChild(textoCodigo);
						divNuevo.appendChild(refParrafo);

						
						
		       			myProgressHechos = $('#indiceRealizaronEncuesta').progressbarManager({
		       					totalValue : value.totalDeberian,
		       					animate : true ,
		       					stripe : true		       			
		       			});
		       			
		       			valueHechos = 0;
		       			
		       			myvalueH = 0;
		       			valorRefH= 0;
		       			valorRefH=value.totalRespondieron;
		       			var refreshIntervalIdH = setInterval(function(){
		       				console.log('entro a set interval hechos: '+'value es: '+myvalueH+', LIMITE es: '+valorRefH)
		       					if(myvalueH <= valorRefH)
		       					{
		       						console.log('estableciend valor hechos: '+myvalueH)
		       						myProgressHechos.setValue(myvalueH);
		       						myvalueH+= 1;
		       					}
		       					else
		       					{
		       						clearInterval(refreshIntervalIdH);
		       						return;
		       					}
		       			},200);
		       			
		       			myProgressHechos.style('warning').animate().stripe();
		       			
		       			/****** TERCER PROGRESS BAR ******/
		       			
		       			divNuevo = document.createElement('div');
						//buttonComponentPrev.setAttribute('type','button');
						divNuevo.setAttribute('id','indiceFaltan');
						refParrafo = document.createElement('pPendientes');
						valorIncompleto = 0;
						valorIncompleto = value.totalDeberian - value.totalRespondieron
						var textoCodigo=document.createTextNode('Pendientes: '+valorIncompleto);
						refDivPadre.appendChild(divNuevo);
						refParrafo.appendChild(textoCodigo);
						divNuevo.appendChild(refParrafo);
		       			
		       			myProgressIncompletos = $('#indiceFaltan').progressbarManager({
		       					totalValue : value.totalDeberian,
		       					animate : true ,
		       					stripe : true		       			
		       			});
		       			
		       			myvalueI = 0;
		       			valorRefI= 0;
		       			valorRefI= value.totalDeberian - value.totalRespondieron;
		       			var refreshIntervalIdI = setInterval(function(){
		       				console.log('entro a set interval incompletos: '+'value es: '+myvalueI+', LIMITE es: '+valorRefI)
		       					if(myvalueI <= valorRefI)
		       					{
		       						console.log('estableciend valor INCOMPLETO: '+myvalueI)
		       						myProgressIncompletos.setValue(myvalueI);
		       						myvalueI+= 1;
		       					}
		       					else
		       					{
		       						clearInterval(refreshIntervalIdI);
		       						return;
		       					}
		       			},200);
		       			
		       			myProgressIncompletos.style('danger').animate().stripe();
		       			
		      		});
		    	}
			}
		});
	}
}

