'use client';

import { Card, Row, Col, Badge } from 'react-bootstrap';

function getInitials(name)
{
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function UserCard({ user })
{
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: 340,
        borderRadius: 18,
        border: 'none',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'transform 0.15s',
      }}
      className="mb-4 user-card-hover"
    >
      <Card.Body>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 24,
                boxShadow: '0 2px 8px rgba(99,102,241,0.15)',
              }}
            >
              {getInitials(user.name)}
            </div>
          </Col>
          <Col>
            <Card.Title className="mb-0" style={{ fontSize: 20, fontWeight: 700 }}>
              {user.name}
            </Card.Title>
            <Card.Subtitle className="text-muted" style={{ fontSize: 14 }}>
              {user.email}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Badge bg="secondary" className="me-2">
              @{user.username}
            </Badge>
            <Badge bg="info" text="dark">
              {user.company?.name}
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col>
            <span style={{ fontSize: 15 }}>
              <strong>Phone:</strong> {user.phone}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

// Add a hover effect for the card
// You can add this to globals.css if you want to keep styles together:
// .user-card-hover:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 8px 32px rgba(99,102,241,0.15); }
