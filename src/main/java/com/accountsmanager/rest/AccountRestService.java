package com.accountsmanager.rest;

import java.util.List;
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
import com.accountsmanager.api.IAccount;
import com.accountsmanager.model.Account;

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
		System.out.println("findById " + id);		
		return iAccount.getAccount(id);						
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Account create(Account Account) {
		return iAccount.create(Account);
	}
	
	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Account update(Account Account) {
		iAccount.update(Account);
		return Account;
	}
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void delete(@PathParam("id") int id) {		
		iAccount.delete(id);
	}

}