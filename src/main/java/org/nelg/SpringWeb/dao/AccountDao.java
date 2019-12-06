package org.nelg.SpringWeb.dao;

import org.nelg.SpringWeb.entity.Account;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDao {

    public List<Account> findAll();

    public void saveAccount(Account account);
}
