// model/Inventory.java
package com.rinl.auction_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int item_id;

    private String item_name;

    private String description;

    private String image_url;

    private int quantity;

    private int created_by_admin_id; // You can replace with @ManyToOne later if needed

    // Getters and Setters

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getCreated_by_admin_id() {
        return created_by_admin_id;
    }

    public void setCreated_by_admin_id(int created_by_admin_id) {
        this.created_by_admin_id = created_by_admin_id;
    }

}
