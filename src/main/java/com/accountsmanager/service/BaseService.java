package com.accountsmanager.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class BaseService {
	
	@PersistenceContext(unitName = "accountsmanagerconnection")
	private EntityManager entityManager;
	
	public EntityManager getEntityManager(){
		return entityManager;
	}
}