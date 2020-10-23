package com.ninos.service;

import com.ninos.model.Customer;

import java.util.List;

public interface CustomerService {

    public Customer addCustomer(Customer customer);

    public List<Customer> findAllCustomer();

    public Customer updateCustomer(Customer customer);

    public Customer findCustomerById(Long id);

    public void deleteCustomer(Long id);


}
