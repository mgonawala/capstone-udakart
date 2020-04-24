import {Table, Column, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class ProductItem extends Model<ProductItem> {

  @Column
  public name: string;

  @Column
  public category: string;

  @Column
  public quantity: number;

  @Column
  public unitPrice: number;

  @Column
  public imageUrl?: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}
