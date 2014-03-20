package com.accountsmanager.api;

import java.util.List;
import javax.ejb.Local;
import com.accountsmanager.model.Account;

/**
 * Interface for Account related Services.
 * 
 * @author Carella Carmine
 * 
 */
@Local
public interface IAccount {

	List<Account> getAccountList();
	
	List<Account> findByName(String name);
	
	Account getAccount(String id);
		
	Account create(Account account);
	
	Account update(Account account);
	
	void delete(int id);
	
	Integer getAccountNumber();
	
}