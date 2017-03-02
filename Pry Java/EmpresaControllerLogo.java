package com.corvustec.indicador.web.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.json.JSONException;
import org.json.JSONObject;

import com.corvustec.web.util.WebUtility;

import org.apache.commons.fileupload.FileItem; 
import org.apache.commons.fileupload.FileItemFactory; 
import org.apache.commons.fileupload.FileUploadException; 
import org.apache.commons.fileupload.disk.DiskFileItemFactory; 
import org.apache.commons.fileupload.servlet.ServletFileUpload; 


@WebServlet("/EmpresaControllerLogo")
public class EmpresaControllerLogo extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private Client client;
	private WebTarget target;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
		
		JSONObject json = null;
		String res;
		String queryString;
		PrintWriter out;
		try {

			queryString=  request.getQueryString();

			if(queryString!=null){
				queryString= URLDecoder.decode(queryString, "UTF-8");
				json = new JSONObject(queryString);
			}
			else{
				json = new JSONObject();
				json.put("empCodigo", "");
			}
			
			client = ClientBuilder.newClient();
			target = client.target(WebUtility.getInstance().getUrlService()+"/administrationRest/readEmpresa/");
			
			res= target.request().accept(MediaType.APPLICATION_JSON).post(Entity.entity(json.toString(), MediaType.APPLICATION_JSON), String.class);
			
			response.getWriter();
			response.setStatus(201);
						
	        out = response.getWriter();
	        json = new JSONObject();
	        json.put("success", true);
	        json.put("data", res);
	        out.print(json);
	        
		} catch (JSONException e) {
	        try {
		        out = response.getWriter();
		        json = new JSONObject();
				json.put("success", false);
				json.put("message", e.toString());
				out.print(json);
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
		}
		
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request); 
		File uploadedFile = new File("");
		boolean file_writed=false;
		RequestDispatcher rd;
		String res="";
		String empLogo="";
		String empCodigo="";
		String root = "";
		String page="";
		PrintWriter out;
			
			
			System.out.println("Empresa Controller Entro a seccion Ingr Logo NO xml: "+ServletFileUpload.FORM_DATA);
			
			if (isMultipart)
            {
				System.out.println("Entro a multipart");
				// Create a factory for disk-based file items
                FileItemFactory factory = new DiskFileItemFactory();
                
                // Create a new file upload handler
                ServletFileUpload upload = new ServletFileUpload(factory);
                try 
                {
					// Parse the request
	                List /* FileItem */ items = upload.parseRequest(request);
	                Iterator iterator = items.iterator();
	                
	                while (iterator.hasNext()) 
                    {
	                	FileItem item = (FileItem) iterator.next();
	                	if (!item.isFormField())
                        {
	            			try{empLogo=request.getParameter("empLogo");}catch(Exception ex){System.out.println(ex);}
	            			try{empCodigo=request.getParameter("empCodigo");}catch(Exception ex){System.out.println(ex);}
	            			
	            			if(empLogo==null){empLogo="";}
	            	        System.out.println("Ayuda ENTRO AL SERVIDOR Empresa controller Y LOGO ES: "+empLogo);
	            	        System.out.println("NOMBRE ARCHIVO: "+empLogo);
	            	        System.out.println("NOMBRE ARCHIVO NUEVO: "+empCodigo);
	            	        root = getServletContext().getRealPath("/");
	            	        File path = new File(root + "/assets/img");
	            	        if (!path.exists()) 
                            { 
	            	        	boolean status = path.mkdirs(); 
                            }
	            	        uploadedFile = new File(path + "/" + empCodigo); 
	            	        
                            System.out.println(uploadedFile.getAbsolutePath()); 
                            item.write(uploadedFile);
                            file_writed=true;
                        }
                    }
	                if(file_writed)
	                	res="success";
	                else
	                	res="Failed";
	                JSONObject json = null;
	                try {
		                
		                response.getWriter();
		    			response.setStatus(201);
		                
		    	        json = new JSONObject();
		    	        json.put("success", true);
		    	        json.put("data", res);
		    	        
	                }catch (JSONException e1) {
	                	
	                	json.put("message", e1.toString());
	    				
        			}
	                out = response.getWriter();
	                out.print(json);
                }
                catch(FileUploadException e)
                {
                	JSONObject json = null;
                	try{
	                	
	                	json = new JSONObject();
	                	e.printStackTrace();
	                	
	                	json.put("message", e.toString());
	                	out = response.getWriter();
		                out.print(json);
                	}
                	catch (JSONException e1) {
                		e1.printStackTrace();
                	}
                }
                catch (Exception e2)
                {
                	JSONObject json = null;
                	try{
	                	
	                	json = new JSONObject();
	                	e2.printStackTrace();
	                	
	                	json.put("message", e2.toString());
	                	out = response.getWriter();
		                out.print(json);
                	}
                	catch (JSONException e1) {
                		e1.printStackTrace();
                	}
                }
            }
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPut(req, resp);
	}


}
