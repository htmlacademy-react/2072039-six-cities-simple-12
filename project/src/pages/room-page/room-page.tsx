import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { getPersentsFromNumber } from '../../utils/getPersentsFromNumber';

import {
  AppRoute,
  MAX_NUMBER_IMAGES,
  AuthStatus,
  COMMENTS_COUNT,
  Status,
} from '../../constants';

import {
  loadNearOffersAction,
  loadOfferAction,
  loadRoomCommentsAction,
} from '../../store/api-actions';

import { getAuthorizationStatus } from '../../store/user/selectors';
import { getIsOfferLoading, getOffer } from '../../store/offer/selectors';
import { getNearbyOffers, getComments } from '../../store/roomInfo/selectors';

import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/maps/maps';
import Loader from '../../components/loaders/loaders';
import OffersList from '../../components/offers-list/offers-list';
import Comment from '../../components/comments/comments';


function RoomPage() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const offerId = Number(id);

  useEffect(() => {
    dispatch(loadOfferAction(offerId));
    dispatch(loadRoomCommentsAction(offerId));
    dispatch(loadNearOffersAction(offerId));
  }, [dispatch, offerId]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const comments = useAppSelector(getComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const offer = useAppSelector(getOffer);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  if (isOfferLoading === Status.Error) {
    return <Navigate to={AppRoute.PageNotFound} replace />;
  }

  return (
    isOfferLoading === Status.Loading
      ? <Loader />
      : (
        <div className="page">
          <Helmet>
            <title>Six cities. Nice option.</title>
          </Helmet>
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {offer?.images
                    .slice(0, MAX_NUMBER_IMAGES)
                    .map((photoUrl) => (
                      <div
                        className="property__image-wrapper"
                        key={photoUrl}
                      >
                        <img
                          className="property__image"
                          src={photoUrl}
                          alt={`${photoUrl}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {offer?.isPremium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {offer?.title}
                    </h1>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: offer ? `${getPersentsFromNumber(offer.rating)}` : '0'}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{offer?.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      Apartment
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer?.bedrooms}
                    </li>
                    <li className="property__feature property__feature--adults">
                      {offer?.maxAdults}
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer?.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {offer?.goods.map((item) => (
                        <li className="property__inside-item" key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div
                        className={
                          `property__avatar-wrapper
                          ${offer?.host.isPro ? 'property__avatar-wrapper--pro' : ''}
                          user__avatar-wrapper`
                        }
                      >
                        <img className="property__avatar user__avatar"
                          src={offer?.host.avatarUrl}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {offer?.host.name}
                      </span>
                      {offer?.host.isPro && <span className="property__user-status">Pro</span>}
                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {offer?.description}
                      </p>
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    {comments && (
                      <>
                        <h2 className="reviews__title">
                            Reviews &middot; <span className="reviews__amount">{comments.length}</span>
                        </h2>
                        <ul className="reviews__list">
                          {comments.length > 0 && (
                            Array.from(comments)
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .slice(0, COMMENTS_COUNT)
                              .map((item) => <Comment key={item.id} comment={item} />)
                          )}
                        </ul>
                        {authorizationStatus === AuthStatus.Auth && <ReviewForm id={offerId} />}
                      </>
                    )}
                  </section>
                </div>
              </div>
              {nearbyOffers && offer && (
                <Map
                  offers={nearbyOffers.concat(offer)}
                  selectedPoint={offerId}
                  city={offer.city}
                  className={'property'}
                />
              )}
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {nearbyOffers && (
                    <OffersList
                      offers={nearbyOffers}
                      onListItemHover={(i) => setActiveCard(Number(i))}
                      selectedPoint={activeCard}
                    />
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
}

export default RoomPage;
