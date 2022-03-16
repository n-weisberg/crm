package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Client struct {
	Id      int
	Name    string
	Phone   string
	Address string
	Recent  time.Time
	Created time.Time
	Status  string
}

// var allClients []Client = []Client{
// 	{"Nick2", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", "02/25/2022", []Estimate{}, "leads"},
// 	{"Ben", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", "02/25/2022", []Estimate{{Date: "03/15/2022", Time: "14:00", Type: "Interior", Notes: []string{}, Amount: 0}}, "estimates"},
// 	{"Alyanna", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", "02/25/2022", []Estimate{}, "booked"},
// 	{"Tyler", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", "02/25/2022", []Estimate{}, "leads"},
// 	{"Ruslan", []string{"3068508556"}, "535 3rd Av N", "03/05/2022", "02/25/2022", []Estimate{}, "rejected"},
// }

func GetClients(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	rows, err := getClients()
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var (
		id      int
		name    string
		phone   string
		address string
		created string
		recent  string
		status  string
	)
	var allClients []Client = []Client{}
	for rows.Next() {
		err = rows.Scan(&id, &name, &phone, &address, &created, &status, &recent)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		_created, err := time.Parse("2006-01-02 15:04:05.0000000", created)
		if err != nil {
			fmt.Println(err)
		}
		_recent, err := time.Parse("2006-01-02 15:04:05.0000000", recent)
		if err != nil {
			fmt.Println(err)
		}
		var curr Client = Client{
			Id:      id,
			Name:    name,
			Phone:   phone,
			Address: address,
			Created: _created,
			Recent:  _recent,
			Status:  status,
		}
		allClients = append(allClients, curr)
	}

	js, err := json.Marshal(allClients)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(js)
}

func AddClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Content-Type", "application/json")
	var client Client
	if r.Method == "OPTIONS" {
		return
	}
	err := json.NewDecoder(r.Body).Decode(&client)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	client.Created = time.Now()
	client.Recent = time.Now()
	client.Status = "Lead"
	insertClient(client)
	w.WriteHeader(http.StatusOK)
}

func EditClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Content-Type", "application/json")
	var client Client
	if r.Method == "OPTIONS" {
		return
	}
	err := json.NewDecoder(r.Body).Decode(&client)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	client.Recent = time.Now()
	editClient(client)
	w.WriteHeader(http.StatusOK)
}

func DeleteClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Content-Type", "application/json")
	var id int
	if r.Method == "OPTIONS" {
		return
	}
	err := json.NewDecoder(r.Body).Decode(&id)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	deleteClient(id)
	w.WriteHeader(http.StatusOK)
}
