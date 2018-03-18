<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="favorites")
 */
class Favorite
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(type="string", unique=true)
     *
     * @var string
     */
    private $meetupId;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     *
     * @var \DateTime
     */
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * Info to be returned through API
     *
     * @return array
     */
    public function restInfo()
    {
        return [
            'id'        => $this->getId(),
            'meetup_id' => $this->getMeetupId(),
        ];
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Favorite
     */
    public function setId(int $id): Favorite
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getMeetupId(): string
    {
        return $this->meetupId;
    }

    /**
     * @param string $meetupId
     * @return Favorite
     */
    public function setMeetupId(string $meetupId): Favorite
    {
        $this->meetupId = $meetupId;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     * @return Favorite
     */
    public function setCreatedAt(\DateTime $createdAt): Favorite
    {
        $this->createdAt = $createdAt;
        return $this;
    }

}
