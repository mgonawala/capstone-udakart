import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import {Order} from "./Order";

@Table
export class OrderItem extends Model<OrderItem> {

  @ForeignKey(() => Order)
  @Column
  public order_id: number;

  @BelongsTo(() => Order)
  public order : Order;

  @Column
  public product_id: string;

  @Column
  public quantity: number;

  @Column
  public price: number;


}
