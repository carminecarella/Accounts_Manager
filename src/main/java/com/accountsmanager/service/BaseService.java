package com.accountsmanager.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Entity manager class.
 * 
 * @author Carella Carmine
 * 
 */

@Stateless
public class BaseService {
	
	@PersistenceContext(unitName = "primary")
	private EntityManager entityManager;
	
	public EntityManager getEntityManager(){
		return entityManager;
	}
}