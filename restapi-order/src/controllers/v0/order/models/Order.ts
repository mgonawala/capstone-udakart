import {Table, Column, Model, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {OrderItem} from "./OrderItem";

@Table
export class Order extends Model<Order> {

  @Column
  public buyer_id: number;

  @Column
  public address: string;

  @Column
  public status: string;

  @Column
  public total: number;

  @HasMany(() => OrderItem)
  public products : OrderItem[];

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();

}
