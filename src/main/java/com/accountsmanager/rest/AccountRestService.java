package com.accountsmanager.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javassist.bytecode.ConstantAttribute;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.accountsmanager.api.IAccount;
import com.accountsmanager.model.Account;
import com.accountsmanager.utils.Consts;

@Path("/accounts")
public class AccountRestService implements IAccount{
	
	@EJB
	private IAccount iAccount;
	
	@GET
	@Path("/getAccountNumber")
	@Override
	public Integer getAccountNumber() {
		return iAccount.getAccountNumber();
	}

	@GET
	@Path("/getAccountList")
	@Produces("application/json")
	@Override
	public List<Account> getAccountList() {
		return iAccount.getAccountList();
	}
	
	@GET 
	@Path("{id}")
	@Produces("application/json")
	public Account getAccount(@PathParam("id") String id) {				
		return iAccount.getAccount(id);						
	}
	
	@GET 
	@Path("/findbyname/{name}")
	@Produces("application/json")
	public List<Account> findByName(@PathParam("name") String name) {			
		return iAccount.findByName(name);						
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Account create(Account Account) {
		return iAccount.create(Account);
	}
	
	@PUT 
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Account update(Account account) {
		iAccount.update(account);
		return account;
	}
	
	@DELETE 
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void delete(@PathParam("id") int id) {		
		iAccount.delete(id);
	}
	
	@GET
	@Path("/picture/{picturename}")
	@Produces("image/png")	
	public Response getFile(@PathParam("picturename") String pictureName) {
		
		String fileName = Consts.BASE_PATH_FILE + File.separator + pictureName;
		
	    File file = new File(fileName);

	    ResponseBuilder response = Response.ok((Object) file);
	    response.header("Content-Disposition", "attachment; filename=image_from_server.png");
	    return response.build();

	}
	
	@POST
	@Path("/upload/{filename}")	
	@Consumes("multipart/form-data")
	public Response uploadFile(	@PathParam("filename") String filename, 
								MultipartFormDataInput input) {
 
		String file = "";
		
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<InputPart> inputParts = uploadForm.get("file");
 
		for (InputPart inputPart : inputParts) {
 
		 try {
 
			MultivaluedMap<String, String> header = inputPart.getHeaders();
			
			//String ext = FilenameUtils.getExtension(getFileName(header));
		
			//convert the uploaded file to inputstream
			InputStream inputStream = inputPart.getBody(InputStream.class,null);
 
			byte [] bytes = IOUtils.toByteArray(inputStream);
 			
			file = Consts.BASE_PATH_FILE + File.separator + filename;
 
			writeFile(bytes,file);
  
		  } catch (IOException e) {
			e.printStackTrace();
		  }
 
		} 
		return Response.status(200).entity("uploadFile is called, Uploaded file name : " + file).build(); 
	}
		
	/**
	 * header sample
	 * {
	 * 	Content-Type=[image/png], 
	 * 	Content-Disposition=[form-data; name="file"; filename="filename.extension"]
	 * }
	 **/
	//get uploaded filename
	private String getFileName(MultivaluedMap<String, String> header) {
 
		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
 
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {
 
				String[] name = filename.split("=");
 
				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}
	
	//save to somewhere
	private void writeFile(byte[] content, String filename) throws IOException {
 
		File file = new File(filename);
 
		if (!file.exists()) {
			file.createNewFile();
		}
 
		FileOutputStream fop = new FileOutputStream(file);
 
		fop.write(content);
		fop.flush();
		fop.close();
 
	}
	
}