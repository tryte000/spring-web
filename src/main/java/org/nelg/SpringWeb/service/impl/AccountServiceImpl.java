package org.nelg.SpringWeb.service.impl;

import org.nelg.SpringWeb.dao.AccountDao;
import org.nelg.SpringWeb.entity.Account;
import org.nelg.SpringWeb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public String findAll() {
        List<Account> accountList = this.accountDao.findAll();
        for (Account account:accountList) {
            System.out.println(account.toString());
        }
        return "";
    }
}
