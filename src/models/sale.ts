import mongoose from 'mongoose';

import { IPlatformDocument } from './platform';
import { IClothingDocument } from './clothing';

interface ISaleAttributes {
  platform: IPlatformDocument;
  salePrice: number;
  feesPaid: number;
  shippingPaid: number;
  clothingItems: IClothingDocument[];
}

export interface ISaleDocument extends mongoose.Document<ISaleAttributes> {
  platform: IPlatformDocument;
  salePrice: number;
  feesPaid: number;
  shippingPaid: number;
  clothingItems: IClothingDocument[];
  isBundle: () => boolean;
}

interface ISaleModel extends mongoose.Model<ISaleDocument> {
  build: (attributes: ISaleAttributes) => ISaleDocument;
}

const saleSchema = new mongoose.Schema<ISaleDocument, ISaleModel>(
  {
    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    feesPaid: {
      type: Number,
      required: true,
    },
    shippingPaid: {
      type: Number,
      required: true,
      default: 0,
    },
    clothingItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

saleSchema.static(
  'build',
  (attributes: ISaleAttributes) => new Sale(attributes)
);

saleSchema.methods.isBundle = function () {
  return this.clothingItems.length <= 1;
};

export const Sale = mongoose.model<ISaleDocument, ISaleModel>(
  'Sale',
  saleSchema
);
