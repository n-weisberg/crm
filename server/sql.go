package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func getClients() (*sql.Rows, error) {
	db, err := sql.Open("mysql", "root:password@tcp(localhost:3306)/crm")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Connection Established")
	}
	defer db.Close()

	rows, err := db.Query("select id, name, phone, address, created, status, recent from client")
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func insertClient(client Client) {
	db, err := sql.Open("mysql", "root:password@tcp(localhost:3306)/crm")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Connection Established")
	}
	defer db.Close()
	stmt, err := db.Prepare("INSERT INTO client(name,phone,address,recent,created,status) VALUES(?,?,?,?,?,?)")
	if err != nil {
		fmt.Println(err)
	}
	_, err = stmt.Exec(client.Name, client.Phone, client.Address, client.Recent, client.Created, client.Status)
	if err != nil {
		fmt.Println(err)
	}
	return
}
