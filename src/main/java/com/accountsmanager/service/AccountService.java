package com.accountsmanager.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import com.accountsmanager.api.IAccount;
import com.accountsmanager.model.Account;

/**
 * Provides service related to Account.
 * 
 * @author Carella Carmine
 */

@Stateless
public class AccountService extends BaseService implements IAccount {

	@Override
	public List<Account> getAccountList() {
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<Account> cq = cb.createQuery(Account.class);		
		Root<Account> pet = cq.from(Account.class);
		cq.select(pet);
		Order order = cb.asc(pet.get("name"));
		cq.orderBy(order);
		TypedQuery<Account> q = getEntityManager().createQuery(cq);
		List<Account> allAccounts = q.getResultList();
		
		return allAccounts;
	}
	
	@Override
	public List<Account> findByName(String name) {
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<Account> cq = cb.createQuery(Account.class);		
		Root<Account> pet = cq.from(Account.class);
		cq.select(pet);
		Order order = cb.asc(pet.get("name"));
		cq.orderBy(order);
		TypedQuery<Account> q = getEntityManager().createQuery(cq);
				
		List<Account> allAccounts = new ArrayList<Account>(); 
		
		for(Account a: q.getResultList()){
			
			String s1 = a.getName().toLowerCase(); 
			String s2 = name.toLowerCase();
			
			if(s1.startsWith(s2)){
				allAccounts.add(a);
			}
		}
		
		return allAccounts;
	}
	
	@Override
	public Account getAccount(String id) {
		try{
			return getEntityManager().find(Account.class, Integer.parseInt(id));
		}catch(NumberFormatException e){
			return null;
		}		
	}
	
	@Override
	public Account create(Account account) {
		try{
			account.setModifyDate(generateTimestamp());
			getEntityManager().persist(account);
			return account;
		}catch(NumberFormatException e){
			return null;
		}		
	}
	
	@Override
	public Account update(Account account) {
		try{
			account.setModifyDate(generateTimestamp());
			getEntityManager().merge(account);
			return account;
		}catch(NumberFormatException e){
			return null;
		}		
	}
	
	@Override
	public void delete(int id) {
		try{			
			getEntityManager().remove(getEntityManager().find(Account.class, id));
			//return account;
		}catch(NumberFormatException e){
			//return null;
		}		
	}
	
	@Override
	public Integer getAccountNumber() {
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<Account> cq = cb.createQuery(Account.class);
		Root<Account> pet = cq.from(Account.class);
		cq.select(pet);
		TypedQuery<Account> q = getEntityManager().createQuery(cq);
		List<Account> allAccounts = q.getResultList();
		
		return allAccounts.size();
	}
	
	private Date generateTimestamp(){
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return gc.getTime();
		//System.out.println(sdf.format(gc.getTime())); 
	}
}