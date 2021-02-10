import mongoose from 'mongoose';

import { ISourceDocument } from './source';
import { IBrandDocument } from './brand';
import { ISaleDocument } from './sale';

export enum Gender {
  MENS = 'mens',
  WOMENS = 'womens',
  BOYS = 'boys',
  GIRLS = 'girls',
  KIDS = 'kids',
}

interface IClothingAttributes {
  description: string;
  source: ISourceDocument;
  cost: number;
  condition?: string;
  brand?: IBrandDocument;
  gender?: Gender;
  type?: string;
  size?: string;
  listDate?: Date;
}

export interface IClothingDocument
  extends mongoose.Document<IClothingAttributes> {
  description: string;
  source: ISourceDocument;
  cost: number;
  sold: boolean;
  condition?: string;
  brand?: IBrandDocument;
  gender?: Gender;
  type?: string;
  size?: string;
  listDate?: Date;
  sale?: ISaleDocument;
}

interface IClothingModel extends mongoose.Model<IClothingDocument> {
  build: (attributes: IClothingAttributes) => IClothingDocument;
}

const clothingSchema = new mongoose.Schema<IClothingDocument, IClothingModel>(
  {
    description: {
      type: String,
      required: true,
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Source',
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    sold: {
      type: Boolean,
      required: true,
      default: false,
    },
    condition: {
      type: String,
      required: false,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    gender: {
      type: String,
      required: false,
      enum: Object.values(Gender),
    },
    type: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    listDate: {
      type: Date,
      required: false,
    },
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sale',
      required: false,
    },
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

clothingSchema.static(
  'build',
  (attributes: IClothingDocument) => new Clothing(attributes)
);

export const Clothing = mongoose.model<IClothingDocument, IClothingModel>(
  'Clothing',
  clothingSchema
);
