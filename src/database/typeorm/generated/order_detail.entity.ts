import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Index("order_details_pkey", ["id"], { unique: true })
@Entity("order_details", { schema: "public" })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("double precision", { name: "price", nullable: true, precision: 53 })
  price: number | null;

  @Column("integer", { name: "amount", nullable: true })
  amount: number | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
