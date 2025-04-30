import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Card from "../models/card";
import { ERROR_CODES } from "../utils/constants";
import NotFoundError from "../errors/not-found-err";
import ForbiddenError from "../errors/forbidden-err";
import BadRequestError from "../errors/bad-request-err";

export const findAllCards = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user!._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные при создании карточки."
          )
        );
      }
      return next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка с указанным _id не найдена.");
      }
      if (String(card.owner) !== userId) {
        throw new ForbiddenError("У вас нет прав на удаление этой карточки.");
      }
      return Card.findByIdAndDelete(cardId).then((deletedCard) =>
        res.status(200).send(deletedCard)
      );
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Передан некорректный _id карточки."));
      }
      return next(error);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user!._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Передан несуществующий _id карточки.");
      }
      return res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные для постановки лайка или некорректный _id карточки."
          )
        );
      }
      return next(error);
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: new mongoose.Types.ObjectId(req.user!._id) } } as any,
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Передан несуществующий _id карточки.");
      }
      return res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные для снятия лайка или некорректный _id карточки."
          )
        );
      }
      return next(error);
    });
};
