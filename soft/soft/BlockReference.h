#pragma once
#include "EntityBase.h"

//½âÎö¿é
class CBlockReference : public CEntityBase
{
public:
	CBlockReference(Dwg_Object_Entity* pEnt);
	~CBlockReference();

	virtual void TransformBy(const BITCODE_3BD& vector) override;

	BITCODE_3BD m_insert;
	BITCODE_H       m_blockHeader;
};