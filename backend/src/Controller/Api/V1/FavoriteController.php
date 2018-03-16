<?php

namespace App\Controller\Api\V1;

use App\Entity\Favorite;
use App\Favorite\FavoriteManager;
use App\Favorite\FavoriteProvider;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;

class FavoriteController extends FOSRestController
{
    /**
     * @var FavoriteManager
     */
    private $favoriteManager;

    /**
     * @var FavoriteProvider
     */
    private $favoriteProvider;

    /**
     * FavoriteController constructor.
     *
     * @param FavoriteManager  $favoriteManager
     * @param FavoriteProvider $favoriteProvider
     */
    public function __construct(FavoriteManager $favoriteManager, FavoriteProvider $favoriteProvider)
    {
        $this->favoriteManager = $favoriteManager;
        $this->favoriteProvider = $favoriteProvider;
    }

    /**
     * @Rest\Get("/api/v1/favorites")
     *
     * @throws \LogicException
     */
    public function list()
    {
        /** @var Favorite[] $favorites */
        $favorites = $this->favoriteProvider->getAllFavorites();
        if ($favorites === null) {
            return [
                'code' => 200,
                'body' => [],
            ];
        }

        return [
            'code' => 200,
            'body' =>
                array_map(function($favorite) {
                    return $favorite->restInfo();
                }, $favorites),
        ];
    }

    /**
     * @Rest\Put("/api/v1/favorites")
     *
     * @param Request $request
     *
     * @return array
     */
    public function add(Request $request): array
    {
        $meetupId = (int) $request->request->get('meetup_id');

        try {
            $favorite = $this->favoriteManager->add($meetupId);
        }
        catch (\Exception $e) {
            return [
                'code'    => 500,
                'message' => 'Error while adding the favorite',
            ];
        }

        return [
            'code' => 200,
            'body' => $favorite->restInfo(),
        ];
    }

    /**
     * @Rest\Delete("/api/v1/favorites/{id}")
     *
     * @param int $id
     *
     * @return array
     */
    public function remove($id): array
    {
        try {
            $this->favoriteManager->remove($id);
        }
        catch (\Exception $e) {
            return [
                'code'    => 500,
                'message' => 'Error while removing the favorite',
            ];
        }

        return [
            'code' => 204,
        ];
    }
}
