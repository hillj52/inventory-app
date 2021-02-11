import mongoose from 'mongoose';

interface ISourceAttributes {
  name: string;
}

export interface ISourceDocument extends mongoose.Document<ISourceAttributes> {
  name: string;
}

interface ISourceModel extends mongoose.Model<ISourceDocument> {
  build(attributes: ISourceAttributes): ISourceDocument;
}

const sourceSchema = new mongoose.Schema<ISourceDocument, ISourceModel>(
  {
    name: {
      type: String,
      required: true,
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

sourceSchema.static(
  'build',
  (attributes: ISourceAttributes) => new Source(attributes)
);

export const Source = mongoose.model<ISourceDocument, ISourceModel>(
  'Source',
  sourceSchema
);
