#include "BlockReference.h"


CBlockReference::CBlockReference(Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pBlockReference = pEnt->tio.INSERT;
	m_insert = pBlockReference->ins_pt;
	m_blockHeader = pBlockReference->block_header;
}

CBlockReference::~CBlockReference()
{

}

void CBlockReference::TransformBy(const BITCODE_3BD& vector)
{
	m_insert.x += vector.x;
	m_insert.y += vector.y;
	m_insert.z += vector.z;
}
